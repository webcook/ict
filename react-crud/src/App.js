import { useEffect, useState } from "react";
import './App.css'
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList"
import Alert from './components/Alert'

const App = () => {

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL ||
    (isLocalhost ? 'http://localhost:3030/expenses' : 'http://3.35.9.69:3030/expenses');


  const [expenses, setExpenses] = useState([])

  // 초기 데이터 로드
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('목록을 불러오지 못했습니다.');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        handleAlert({ type: 'danger', text: error.message });
      }
    };
    fetchExpenses();
  }, []);

  const handleCharge = (e) => {
    console.log("현재 charge는: ", e.target.value, "입니다.")
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    console.log("현재 amount는: ", e.target.value, "입니다. 타입은 ", typeof(e.target.value), "입니다.")
    setAmount(e.target.valueAsNumber);
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('삭제에 실패했습니다.');
      const newExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(newExpenses);
      handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
    } catch (error) {
      handleAlert({ type: 'danger', text: error.message });
    }
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(()=>{
      setAlert({ show: false });
    }, 7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const clearItems = async () => {
    try {
      await Promise.all(
        expenses.map((exp) => fetch(`${API_BASE_URL}/${exp.id}`, { method: 'DELETE' }))
      );
      setExpenses([]);
      handleAlert({ type: 'success', text: '전체 목록이 삭제되었습니다.' });
    } catch (error) {
      handleAlert({ type: 'danger', text: '전체 삭제 중 오류가 발생했습니다.' });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      try {
        if (edit) {
          const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ charge, amount })
          });
          if (!response.ok) throw new Error('수정에 실패했습니다.');
          const updated = await response.json();
          const newExpenses = expenses.map(item => (item.id === id ? updated : item));
          setExpenses(newExpenses);
          setEdit(false);
          handleAlert({ type: 'success', text: "아이템이 수정되었습니다" });
        } else {
          const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ charge, amount })
          });
          if (!response.ok) throw new Error('생성에 실패했습니다.');
          const created = await response.json();
          const newExpenses = [...expenses, created];
          setExpenses(newExpenses);
          handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
        }
        setCharge("");
        setAmount(0);
      } catch (error) {
        handleAlert({ type: 'danger', text: error.message });
      }
    }
    else {
      handleAlert({ type: "danger", text: "charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다." });
    }
  }

  return(
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        <ExpenseForm
          charge = {charge}
          handleCharge = {handleCharge}
          amount = {amount}
          handleAmount = {handleAmount}
          handleSubmit = {handleSubmit}
          edit = {edit}
        />
      </div>

      <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        {/* Expense List */}
        <ExpenseList
          expenses = {expenses}
          handleDelete = {handleDelete}
          handleEdit = {handleEdit}
          clearItems = {clearItems}
        />
      </div>

      <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
        <p style={{fontSize: '2rem'}}>
          총지출:
          <span>
            {expenses
              .reduce((acc, curr) => {
                return acc + curr.amount;
              }, 0)
              .toLocaleString('ko-KR')}
            원
          </span>
        </p>
      </div>
    </main>
  )
}

export default App;