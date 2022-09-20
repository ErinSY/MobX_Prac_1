# MobX 연습\_ Todo List 만들기

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
