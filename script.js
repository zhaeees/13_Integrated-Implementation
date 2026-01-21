// 화면에서 사용할 데이터 (서버 데이터 복사)
let students = [...serverStudents];

// 현재 선택된 필터 상태
let currentFilter = "전체";

const studentList = document.getElementById("studentList");
const filterButtons = document.querySelectorAll(".filter button");
const personnel = document.getElementById("personnel");

/* 상태 값을 class로 변환 */
function getStatusClass(status) {
  if (status === "출석") return "present";
  if (status === "지각") return "late";
  if (status === "결석") return "absent";
}

/* 학생 렌더링 함수 */
function renderStudents() {
  studentList.innerHTML = "";

  // 필터 조건에 맞는 학생만 추림
  const filteredStudents = students.filter(student => {
    if (currentFilter === "전체") return true;
    return student.status === currentFilter;
  });

  // 인원수 표시
  personnel.textContent = `총 ${filteredStudents.length}명`;
  
  // 카드 생성
  filteredStudents.forEach(student => {
    const card = document.createElement("div");
    
    card.className = "card";

    card.innerHTML = `
      <div class="id-code">${student.id}</div>
      <div class="name">${student.name}</div>
      <div class="class">${student.className}</div>
      <div class="status ${getStatusClass(student.status)}">
    ${student.status}
  </div>
    `;

    studentList.appendChild(card);
  });
}

/* 필터 버튼 클릭 */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // active 처리
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // 필터 상태 변경
    currentFilter = button.dataset.filter;

    // 다시 렌더링
    renderStudents();
  });
});

// 최초 렌더링
renderStudents();