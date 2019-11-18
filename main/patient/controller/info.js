// const convertInfoToMarkdown = (data, sequence) => {
//   const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
//   const formatHeader = str =>
//     str
//       .split("_")
//       .map(i => capitalize(i))
//       .join(" ");
//   const formatting = str => {
//     if (Array.isArray(data[str]))
//       return `${formatHeader(str)}: ${capitalize(data[str].join(", "))}${nxt}`;
//     else return `${formatHeader(str)}: ${capitalize(`${data[str]}`)}${nxt}`;
//   };

//   const nxt = "  \n";
//   const header = `###PATIENT PARTICULARS${nxt}`;

//   const contentList = [header];
//   sequence.forEach(item => {
//     if (item === "countries_visited")
//       contentList.push(
//         `${formatHeader(item)}: ${capitalize(data.country.join(", "))}${nxt}`
//       );
//     else contentList.push(formatting(item));
//   });
//   const dataString = contentList.join("");

//   return dataString;
// };

const convertInfoToMarkdown = (header, value) => {
  const nxt = "  \n";
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  const formatHeader = str =>
    str
      .split("_")
      .map(i => capitalize(i))
      .join(" ");
  if (Array.isArray(value))
    return `${formatHeader(header)}: ${capitalize(value.join(", "))}${nxt}`;
  else return `${formatHeader(header)}: ${capitalize(`${value}`)}${nxt}`;
};

exports.get = async (req, res, data, demoData) => {
  const name = req.body.name;
  if (name in data) {
    const { medicine, payment, country, reason, accident, police } = demoData;
    const resData = {
      ...data[name],
      medicine,
      payment,
      country,
      reason,
      accident,
      police
    };
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
    "countries_visited",
    "reason",
    "accident",
    "police"
  ];

  const info9 = [
    "temperature",
    "blood_pressure",
    "heart_rate",
    "respiratory_rate",
    "spo2"
  ];
  const info10 = ["medicine", "payment"];
  if (name && name in data && step !== 0) {
    const resData = {
      ...data[name],
      medicine: demoData.medicine,
      payment: demoData.payment,
      status: demoData.status,
      country: demoData.country,
      reason: demoData.reason,
      accident: demoData.accident,
      police: demoData.police
    };
    const contentList = [];
    const nxt = "  \n";
    if (step >= 0) {
      const header = `###PATIENT PARTICULARS${nxt}`;
      contentList.push(header);
      info3.forEach(item => {
        if (item === "countries_visited") {
          contentList.push(convertInfoToMarkdown(item, resData.country));
        } else contentList.push(convertInfoToMarkdown(item, resData[item]));
      });
      contentList.push(nxt);
    }
    if (step >= 3) {
      const header = `###TRIAGE RESULTS${nxt}`;
      contentList.push(header);
      info9.forEach(item => {
        contentList.push(convertInfoToMarkdown(item, resData[item]));
      });
      contentList.push(nxt);
    }
    if (step >= 9) {
      const header = `###MEDICINE ISSUED${nxt}`;
      contentList.push(header);
      info10.forEach(item => {
        contentList.push(convertInfoToMarkdown(item, resData[item]));
      });
    }
    if (step >= 10) {
      contentList.push(
        convertInfoToMarkdown("payment_completed", resData.status)
      );
    }
    res.send(contentList.join(""));
  } else if (step === 0) res.status(500).send("No conversation is created.");
  else res.status(500).send("Name not found.");
};
