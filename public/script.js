const jsonUrl = 'http://localhost:3000/data.json';
const TOSRefundConfig = { //refund time policy based on signed TOS
  "phone" : {
    "old" : 4, //time in hours
    "new" : 8,
  },
  "web app" : {
    "old" : 8,
    "new" : 16
  }
}
const TOSBreakpoint = new Date(2020,0,2)

function normalizeDate(isUS = false, dateString, timeString) { // we normalize all US and non-US dates to a common Date object
  const dateParts = dateString.split('/').map(Number);
  const [firstPart, secondPart, year] = isUS ? dateParts : [dateParts[1], dateParts[0], dateParts[2]];
  const month = firstPart - 1;
  const day = secondPart;
  let resultDate = new Date(year, month, day);
  if (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    resultDate.setHours(hours, minutes);
  }
  return resultDate
}

function calculateTOS(normalizedSignUpDate){
  return (normalizedSignUpDate.getTime() > TOSBreakpoint.getTime()) ? "new" : "old"
}


function calculateApprovalStatus(investmentDate,refundRequestDate,signedTOS,refundOrigin){
  return investmentDate.getTime() + (TOSRefundConfig[refundOrigin][signedTOS] * 3600000) > refundRequestDate.getTime();
}

function renderApprovalStatus(){
  fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const reversalRequests = data.reversalRequests.map((req) => {
      const isUS = req.customerLocation === 'US';
      const normalizedSignUpDate = normalizeDate(isUS, req.signUpDate);
      const normalizedInvestmentDate = normalizeDate(isUS, req.investmentDate, req.investmentTime);
      const normalizedrefundRequestDate = normalizeDate(isUS, req.refundRequestDate, req.refundRequestTime);
      const signedTOS = calculateTOS(normalizedSignUpDate);
      const reversalApproved = calculateApprovalStatus(normalizedInvestmentDate, normalizedrefundRequestDate, signedTOS, req.requestSource);

      return {
        ...req,
        normalizedSignUpDate,
        normalizedInvestmentDate,
        normalizedrefundRequestDate,
        signedTOS,
        reversalApproved,
      };
    });

    console.log(reversalRequests)
    
    reversalRequests.forEach(req => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const statusCell = document.createElement("td");
      
      nameCell.textContent = req.name;
 
      statusCell.textContent = req.reversalApproved ? "Approved" : "Denied";
      statusCell.classList.add(req.reversalApproved ? "status-approved" : "status-denied");
      
      row.appendChild(nameCell);
      row.appendChild(statusCell);
      
      refundList.appendChild(row);
    });

  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}

renderApprovalStatus();