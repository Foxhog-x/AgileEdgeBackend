const transformEvents = (data) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const tranformArray = data.filter((todayEvent) => {
    const start = todayEvent.start.substring(0, 10);

    if (!todayEvent.start.split("").includes("T")) {
      if (todayEvent.start.substring(0, 10) === formattedDate) {
        todayEvent.start = null;
        todayEvent.end = "all Day";
        return todayEvent;
      }
    }

    if (formattedDate === start) {
      return todayEvent;
    }
  });
  console.log(tranformArray);
  return tranformArray;
};

module.exports = transformEvents;
