import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../Components/Context/Context";
function useFetchData() {
  const [myData, setMyData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [InboxData, setInboxData] = useState([]);
  const [SentData, setSentData] = useState([]);
  const [InboxDataUnread, setInboxDataUnread] = useState([]);

  const AuthCtx = useContext(AuthContext);

  const inboxdata = useCallback(
    (Data) => {
      console.log({ Data: Data });
      return Data.filter((item) => item.To === AuthCtx.email);
    },
    [AuthCtx.email]
  );

  const inboxdataUnread = useCallback(
    (data) => {
      console.log({ data: data });
      return data.filter(
        (item) => item.To === AuthCtx.email && item.Read === false
      );
    },
    [AuthCtx.email]
  );

  const sentdata = useCallback(
    (data) => {
      return data.filter((item) => item.From === AuthCtx.email);
    },
    [AuthCtx.email]
  );

  const fetchRequest = useCallback(async () => {
    const response = await fetch(
      `https://mailbox-f3786-default-rtdb.asia-southeast1.firebasedatabase.app/emails.json`
    );
    if (response.ok) {
      const data = await response.json();
      let loadedTasks = [];
      Object.entries(data).map((item) => {
        let [id, value] = item;
        loadedTasks.push({
          Id: id,
          Subject: value.Subject,
          Content: value.Content,
          Read: value.Read,
          Date: value.Date,
          Trash: value.Trash,
          From: value.From,
          To: value.To,
          Stared: value.Stared,
          Important: false,
        });
      });
      loadedTasks.sort(
        (a, b) => Date.parse(new Date(b.Date)) - Date.parse(new Date(a.Date))
      );
      setMyData(loadedTasks);
      setInboxData(inboxdata(loadedTasks));
      setSentData(sentdata(loadedTasks));
      setInboxDataUnread(inboxdataUnread(loadedTasks));
      setisLoading(false);
    } else {
      console.log("Error while fetching.");
      setError(true);
    }
    console.log({ myData: myData });
  }, []);

  return {
    isLoading,
    myData,
    Error,
    InboxData,
    SentData,
    InboxDataUnread,
    fetchRequest,
  };
}
export default useFetchData;
