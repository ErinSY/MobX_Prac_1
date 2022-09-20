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

<br>
<br>
<hr>
<br>
<br>

## 3. 특정데이터 선택하기 \_ 삭제 / 업데이트 기능

> TodoList테이블에 보여지고 있는 데이터 (배열안에 들어가있는 todo들)중 하나를 선택하면 선택된 항목의 데이터가 다시 사용자 입력창에 보여지게 된다. 그 후 , 데이터를 수정하여 `update`버튼을 누르면 데이터가 업데이트 되고 `delete`버튼을 누르면 삭제된다.

<br>

### 1. 데이터 선택

- Store의 this.\_todo에 선택된 데이터를 대입
- 마찬가지로 컨테이너에서 함수를 만들어주고 view로 보내준다.
- view에서 사용

```js

// /store.js
@observable
  _todo = {};

  get todo() {
    return this._todo;
  }

  selectTodo = (todo) => {
    this._todo = todo;
  };

```

```js
// /viewcomponent.js
// 데이터리스트를  map으로 뿌려주었으므로 해당 todo가 담긴다.
{
  Array.isArray(todo) && todo.length ? (
    todo.map((todo) => (
      <TableRow key={todo.id} hover onClick={() => onselected(todo)}>
        <TableCell>{todo.title}</TableCell>
        <TableCell>{moment(todo.date).format('YYYY-MM-DD')}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell>Empty</TableCell>
    </TableRow>
  );
}
```

<br>

### 2. 데이터 업데이트

- 데이터리스트중, 선택되어있는 todo의 id 값이 같은 todo를 찾는다.
- 찾은 todo의 title / date값을 새로운 값으로 바꿔준다.
- 마찬가지로 컨테이너에서 함수를 만들어주고 view로 보내준다.
- view에서 사용

```js
  @action
  updateTodo = () => {
    let selected = this._todos.find((todo) => this._todo.id === todo.id);
    selected.title = this._todo.title;
    selected.date = this._todo.date;
    this._todo = {}; // todo비우기
  };
```

<br>

### 3. 데이터 삭제

- 데이터리스트중, 선택되어있는 todo의 index값을 찾는다
- 데이터리스트 배열에서 splice 메서드를 사용하여 해당 데이터를 삭제해준다.
- 마찬가지로 컨테이너에서 함수를 만들어주고 view로 보내준다.
- view에서 사용

```js
  @action
  deleteTodo = () => {
    let selected = this._todos.find((todo) => this._todo.id === todo.id);
    let index = this._todos.indexOf(selected);
    this._todos.splice(index, 1);
    this._todo = {};
  };
```
