import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAdExpences } from "../../features/userIncomes/userIncomeSlice";
import { updateAdExpences } from "../../features/userIncomes/userIncomeSlice";

function AdminAdExpences() {
  const dispatch = useDispatch();
  const [spendTitle, setSpendTitle] = useState("");
  const [changeCost, setChangeCost] = useState(null);
  const [index, setIndex] = useState(null);
  const titles = ["Dec 10", "Dec 18", "Dec 26", "Jan 3", "Jan 9"];

  const { adExpences, expenceLoader } = useSelector(
    (state) => state.userincomes
  );

  const userSpends = (e) => {
    e.preventDefault();
    const data = {
      index: index,
      value: changeCost,
    };
    dispatch(updateAdExpences(data));
  };

  useEffect(() => {
    if (adExpences.length <= 0) {
      dispatch(getUserAdExpences());
    }
  }, []);
  return (
    <div>
      <div style={{ marginTop: "80px" }}>
        <div>
          <form>
            <input type="text" disabled={true} value={spendTitle} />
            <input
              type="number"
              value={changeCost}
              onChange={(e) => setChangeCost(e.target.valueAsNumber)}
            />
            <button onClick={userSpends}>Update</button>
          </form>
        </div>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Spend</th>
          </tr>
          {expenceLoader ? (
            <h1>loading</h1>
          ) : (
            titles.map((info, i) => {
              return (
                <tr>
                  <td>{info}</td>
                  <td>{adExpences[i]}</td>
                  <button
                    onClick={() => {
                      setSpendTitle(info);
                      setChangeCost(adExpences[i]);
                      setIndex(i);
                    }}
                  >
                    update
                  </button>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </div>
  );
}

export default AdminAdExpences;
