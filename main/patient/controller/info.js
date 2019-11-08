const convertInfoToMarkdown = (data, sequence) => {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  const formatHeader = str =>
    str
      .split("_")
      .map(i => capitalize(i))
      .join(" ");
  const formatting = str => {
    if (Array.isArray(data[str]))
      return `${formatHeader(str)}: ${capitalize(data[str].join(", "))}${nxt}`;
    else return `${formatHeader(str)}: ${capitalize(`${data[str]}`)}${nxt}`;
  };

  const nxt = "  \n";
  const header = `###Patient Data${nxt}`;
  const againString = `Type **info** to show this again${nxt}`;

  const contentList = [header, againString];
  sequence.forEach(item => {
    contentList.push(formatting(item));
  });
  const dataString = contentList.join("");

  return dataString;
};

exports.get = async (req, res, data, demoData) => {
  const name = req.body.name;
  if (name in data) {
    const { medicine, payment } = demoData;
    const resData = { ...data[name], medicine, payment };
    res.json(resData);
  } else res.status(500).send("Name not found.");
};

exports.markD = async (req, res, data, demoData) => {
  const name = demoData.name;
  const step = demoData.step;
  const info3 = [
    "name",
    "nric",
    "phone",
    "last_visit",
    "height",
    "weight",
    "age",
    "blood_group",
    "address",
    "medical_conditions",
    "emergency_contact",
    "emergency_relation",
    "countries_visited"
  ];
  const info9 = info3.concat([
    "temperature",
    "blood_pressure",
    "heart_rate",
    "respiratory_rate",
    "spo2"
  ]);
  const info10 = info9.concat(["medicine", "payment"]);
  const info11 = info10.concat(["status"]);
  if (name && name in data && step !== 0) {
    const { medicine, payment, status } = demoData;
    const resData = { ...data[name], medicine, payment, status };
    let formattedString = "";
    if (step < 3) formattedString = convertInfoToMarkdown(resData, info3);
    else if (step < 9) formattedString = convertInfoToMarkdown(resData, info9);
    else if (step < 10)
      formattedString = convertInfoToMarkdown(resData, info10);
    else formattedString = convertInfoToMarkdown(resData, info11);
    res.send(formattedString);
  } else if (step === 0) res.status(500).send("No conversation is created.");
  else res.status(500).send("Name not found.");
};
