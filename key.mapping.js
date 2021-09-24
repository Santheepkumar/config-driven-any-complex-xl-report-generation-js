const pushIf = (arr, fld) => {
  if (!arr || !fld) return;
  arr.push(fld);
};

function getName(user) {
  if (!user) return;

  const fieldsNeeded = ["salutation", "firstName", "lastName"];
  const names = [];

  fieldsNeeded.forEach((fn) => pushIf(names, user[fn]));

  return names.join(" ");
}

function getAddress(obj) {
  if (!obj) return;
  const fieldsNeeded = [
    "streetLine1",
    "streetLine2",
    "city",
    "state",
    "postalCode",
  ];
  const address = [];
  fieldsNeeded.forEach((fn) => pushIf(address, obj[fn]));
  return address.join(", ");
}

function yesOrNo(bool) {
  if (!(typeof bool === "boolean")) return;
  return bool ? "Yes" : "No";
}

const primaryFields = [
  { heading: "Company Name", key: "formData.company.name" },
  { heading: "Application Name", key: "formData.company.name" },
];

module.exports = [
  {
    sheetName: "Company",
    fields: [
      ...primaryFields,
      // Review
      {
        heading: "Incorporation Date",
        key: "formData.company.incorporationDate",
      },
      {
        heading: "Incubated",
        key: "formData.company.associatedWithIncubator",
        exportValue: yesOrNo,
      },
      {
        heading: "Phone",
        key: "formData.company.phone",
      },
      {
        heading: "Email",
        key: "formData.company.email",
      },
      {
        heading: "Registered Address",
        key: "formData.company.registeredAddress",
        exportValue: getAddress,
      },
      {
        heading: "Current Address",
        key: "formData.company.currentAddress",
        exportValue: getAddress,
      },
      {
        heading: "CIN Registration Number",
        key: "formData.company.registrationNumber",
      },
      {
        heading: "DPIIT Registration",
        key: "formData.company.dpiitRegistered",
        exportValue: yesOrNo,
      },
    ],
  },
  {
    sheetName: "Product",
    fields: [
      ...primaryFields,
      // Review
      {
        heading: "Product Category",
        key: "formData.product.productCategory",
      },
      {
        heading: "Product Description",
        key: "formData.product.description",
      },
      {
        heading:
          "Regulatory approvals and required certifications for the product to sell in India",
        key: "formData.product.regApproval",
        exportValue: yesOrNo,
      },
      {
        heading: "Stage of Product",
        key: "formData.product.productStage",
      },
      {
        heading: "Details / support required for regulatory/certification",
        key: "formData.product.regApprovalDetails",
      },
      {
        heading: "Patent Filed",
        key: "formData.product.filedPatent",
        exportValue: yesOrNo,
      },
      {
        heading: "Not Filed Reason",
        key: "formData.product.notFiledReason",
      },
      {
        heading: "Patent Validated ot Tested",
        key: "formData.product.validated",
        exportValue: yesOrNo,
      },
      {
        heading: "List of institute/s who have validated / Tested the product",
        key: "formData.product.validatedInstitutions",
      },
      {
        heading: "Product/Solution Deployed",
        key: "formData.product.deployed",
        exportValue: yesOrNo,
      },
      {
        heading:
          "Cost/Estimated cost per unit of the product/solution under the CAWACH program",
        key: "formData.product.costPrice",
      },
      {
        heading:
          "Selling price/proposed selling price per unit of the product/solution to be offered under the CAWACH program",
        key: "formData.product.sellingPrice",
      },
      {
        heading: "Types of Support required",
        key: "formData.product.supportNeeded",
        exportValue: (field) => field.map((x) => x).join(", "),
      },
      {
        heading: "Additional support requirements",
        key: "formData.product.supportRequirements",
      },
    ],
  },
  {
    sheetName: "Founders",
    key: "formData.founders",
    primaryFields,
    fields: [
      { heading: "Name", key: "name" },
      { heading: "Email", key: "email" },
      { heading: "Phone", key: "phone" },
      { heading: "Role", key: "role" },
      { heading: "Date of Birth", key: "dob" },
      {
        heading: "Shareholding Percentage",
        key: "shareholdingPercentage",
        exportValue: (field) => `${field}%`,
      },
      {
        heading: "Category",
        key: "category",
      },
      {
        heading: "Qualification",
        key: "qualification",
      },
      {
        heading: "Experience",
        key: "experience",
      },
    ],
  },
  {
    sheetName: "Directors",
    key: "formData.directors",
    primaryFields,
    fields: [
      { heading: "Directors Name", key: "name" },
      { heading: "Din Number", key: "dinNumber" },
    ],
  },
  {
    sheetName: "Financials",
    fields: [
      ...primaryFields,
      {
        heading:
          "Funding requested to deploy solution proposed under COVID- 19",
        key: "formData.finance.requiredFunding",
      },
      {
        heading: "COVID-19 solution related Funding Raised",
        key: "formData.finance.covidFund",
        exportValue: yesOrNo,
      },
      {
        heading: "COVID-19 solution related Funding Applied in other agency",
        key: "formData.finance.otherCovidFunding",
        exportValue: yesOrNo,
      },
      {
        heading: "Amount Bootstrapped",
        key: "formData.finance.bootstrapped",
        exportValue: yesOrNo,
      },
      {
        heading: "External Funding Raised by startup",
        key: "formData.finance.externalFund",
        exportValue: yesOrNo,
      },
      {
        heading: "Turnover in last 2 years",
        key: "formData.finance.turnoverYear2",
      },
    ],
  },
  {
    sheetName: "Review",
    fields: [
      ...primaryFields,
      // Review
      {
        heading: "Level 1 CSC Reviewer evaluation Score",
        key: "reviewData.cscScoring.score",
      },
      {
        heading: "Level 1 CSC Reviewer evaluation Bonus Score",
        key: "reviewData.cscScoring.bonusScore",
      },
      {
        heading: "Level 1 CSC Reviewer evaluation Total Score",
        key: "reviewData.cscScoring.totalScore",
      },
      {
        heading: "Level 1 CSC Reviewer evaluation Remarks",
        key: "reviewData.cscScoring.remarks",
      },
      {
        heading: "Level 2 Empowered Committee Review Total Score",
        key: "reviewData.cmcFinalReview.totalScore",
      },
      {
        heading: "Level 2 Empowered Committee Review Unit Cost",
        key: "reviewData.cmcFinalReview.unitCost",
      },
      {
        heading: "Level 2 Empowered Committee Review Remarks",
        key: "reviewData.cmcFinalReview.remarks",
      },
    ],
  },
  {
    sheetName: "Level 1 CSC Reviewer evaluation",
    key: "reviewData.cscScoring.reviewerEvaluation",
    primaryFields,
    fields: [
      {
        heading: "Name",
        key: "firstName",
        exportValue: (_, reviewer) => getName(reviewer),
      },
      {
        heading: "Phone",
        key: "phone",
      },
      {
        heading: "Email",
        key: "email",
      },
      {
        heading: "Organization",
        key: "organization",
      },
      {
        heading: "Organization",
        key: "organization",
      },
    ],
  },
];
