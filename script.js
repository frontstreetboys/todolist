// localStorage에서 기존 데이터 불러오기

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// localStorage에 저장하는 함수
// JSON.stringify()로 배열 → 문자열 변환 후 저장
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Enter 키 입력 감지 (onkeydown 이벤트)
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

// 할 일 추가
function addTodo() {
  // document.querySelector()로 입력창 가져오기
  const input = document.querySelector('#todoInput');
  const text = input.value.trim(); // .trim()으로 공백만 입력했을 때 방지

  if (text === '') {
    alert('할 일을 입력해 주세요!');
    return;
  }

  // 새 할 일 객체 생성
  const newTodo = {
    id: Date.now(), // 고유 ID
    text: text,
    done: false
  };

  todos.push(newTodo); // 배열에 추가
  saveTodos();         // localStorage에 저장
  input.value = '';    // 입력창 비우기
  renderTodos();       // 화면 다시 그리기
}

// ④ 완료 상태 토글 (classList로 done 클래스 추가/제거)
function toggleDone(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = !todos[i].done;
    }
  }
  saveTodos();
  renderTodos();
}

// 수정 모드 진입
function startEdit(id) {
  const item = document.querySelector('[data-id="' + id + '"]');
  const textEl = item.querySelector('.todo-text');
  const editInput = item.querySelector('.edit-input');
  const editBtn = item.querySelector('.edit-btn');
  const saveBtn = item.querySelector('.save-btn');

  // 텍스트 숨기고 입력창 보여주기
  textEl.style.display = 'none';
  editInput.style.display = 'inline';
  editBtn.style.display = 'none';
  saveBtn.style.display = 'inline';

  editInput.value = textEl.textContent;
  editInput.focus();

  editInput.onkeydown = function(e) {
    if (e.key === 'Enter') saveEdit(id);
  };
}

// 수정 저장
function saveEdit(id) {
  const item = document.querySelector('[data-id="' + id + '"]');
  const editInput = item.querySelector('.edit-input');
  const newText = editInput.value.trim(); // .trim()으로 공백만 입력했을 때 방지

  if (newText === '') {
    alert('내용을 입력해 주세요!');
    return;
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].text = newText;
    }
  }

  saveTodos();
  renderTodos();
}

// 할 일 삭제
function deleteTodo(id) {
  if (!confirm('삭제할까요?')) return;

  let newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newTodos.push(todos[i]);
    }
  }
  todos = newTodos;
  saveTodos();
  renderTodos();
}

// ② 화면 업데이트 - innerHTML로 HTML 문자열 출력
function renderTodos() {
  // 카운트 업데이트
  let doneCount = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) doneCount++;
  }
  document.querySelector('#totalCount').textContent = todos.length;
  document.querySelector('#doneCount').textContent = doneCount;

  // 빈 목록 처리
  const emptyMsg = document.querySelector('#emptyMsg');
  if (todos.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
  }

  // HTML 문자열 만들기
  let html = '';
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const doneClass = todo.done ? 'done' : '';

    html += '<div class="todo-item ' + doneClass + '" data-id="' + todo.id + '">';
    html += '  <input type="checkbox" ' + (todo.done ? 'checked' : '') + ' onclick="toggleDone(' + todo.id + ')" />';
    html += '  <span class="todo-text">' + todo.text + '</span>';
    html += '  <input type="text" class="edit-input" />';
    html += '  <button class="edit-btn" onclick="startEdit(' + todo.id + ')">수정</button>';
    html += '  <button class="save-btn" style="display:none" onclick="saveEdit(' + todo.id + ')">저장</button>';
    html += '  <button onclick="deleteTodo(' + todo.id + ')">삭제</button>';
    html += '</div>';
  }

  // document.querySelector() + .innerHTML 로 화면에 출력
  document.querySelector('#todoList').innerHTML = html;
}

// 페이지 처음 로드 시 렌더링
renderTodos();
