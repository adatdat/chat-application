import './App.css';
import PropDemo from './component/demoProps'
function App() {

const data = {
  username : 'quang123',
  password : 'quang'
}

return (
    <div className="App" >
      <PropDemo demo = { data }/>
    </div>
  );
}

export default App;
