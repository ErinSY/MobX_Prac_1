# MobX 연습\_ Todo List 만들기

## 1. 데이터 업데이트 감지

> input 창의 title 과 Date를 바꾸면 TodoStore에 있는 observable 데이터가 업데이트되며 input Value에서 감지 / 업데이트

### 사용된 컴포넌트

- Container : `TodoEditFormContainer`
- View : `TodoEdotFormView`

### 순서

1. TodoStore 폴더/파일 생성
   /stores/TodoStore.js

2. observable 데이터 생성

- 데이터를 객체로 생성 (추후 데이터 추가됨을 대비)
- 데이터가 추가되는 action생성

```js
  @action
  setTodos = (name, value) => {
    this.todo = { ...this.todo, [name]: value };
  };
```

3. View컴포넌트를 가지고있는 Container컴포넌트를 Store과 연결

- 모든 컴포넌트에서 사용할 수 있도록 가장 상위컴포넌트인 `index.js` 에 provider API적용

- import inject / observer / autobind API

4. View로 필요한 observable 데이터 props로 넘기기

- todo데이터와 action 메서드 모두

```js
class TodoEditFormContainer extends Component {
  setToDo(name, values) {
    this.props.value.setTodos(name, values); // 함수로 따로 빼준후
  }

  render() {
    const { value } = this.props;
    return <TodoEditFormView todo={value.todo} setToDo={this.setToDo} />; // this.함수이름 으로 넘겨준다.
  }
}
```

- class컴포넌트에서 props넘기기 :
  `const {~} = this.props`

5. View 컴포넌트에서 필요한데이터 사용.

- input value : `value={todo && todo.title ? todo.title : ''}`
- onChange : `onChange={(event) => setToDo('title', event.target.value)}`

<br>
<br>
<hr>
<br>
<br>

## 2. 데이터 추가기능

> ADD 버튼을 누르면 TodoStore에 `todos`라는 배열객체를 선언하고 사용자가 입력한 값과 날짜를 담아 `TodoListContainer`컨테이너를 통해 `TodoListView`에 보여지게됨.

### 사용된 컴포넌트

- Container : `TodoListContainer`
- View : `TodoListView`

### 순서

1. TodoStore 에 todo가 추가될 observable 배열 추가

```js
 @observable //1. todos 배열추가
  _todos = [];
```

<br>

2. TodoStor에 배열에 todo추가하는 action 메소드생성

```js
  @action
  addTodos = (todo) => {
    this._todos.push(todo);
  };
```

<br>

3. EditContainer에 함수추가 및 EditView로 함수 넘겨주기

```js
  addTodo() {                 // 3. 함수추가
    let todo = this.props.value;    // todo 가져오기
    todo = { ...todo, id: generateId(5) };  // id 값추가해주기
    this.props.value.addTodos(todo);  //  todo 넣어주기
  }

  render() {
    const { value } = this.props;
    return (
      <TodoEditFormView
        addTodo={this.addTodo}
      />
    );
  }
```

<br>

4. EditView의 ADD 버튼에 넘겨받은 함수 연결

```js
render() {
    const {addTodo } = this.props;

    return (
  <Button onClick={addTodo}>Add</Button>
  )
}
```

<br>

5. TodoListContainer / TodoListView 컴포넌트에서 inject > props넘겨주기 > 데이터 사용
   재진행.
