// import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchBox() {
  const data = useSelector((state) => state.Test.usersData);

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  //

  // const url = new URL("https://PROJECT_TOKEN.mockapi.io/users/1/tasks");
  // url.searchParams.append("title", "hello");
  // fetch(url, {
  //   method: "GET",
  //   headers: { "content-type": "application/json" },
  // })
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     // handle error
  //   })
  //   .then((tasks) => {
  //     // mockapi returns only tasks that match hello string
  //     console.log(tasks);
  //   })
  //   .catch((error) => {
  //     // handle error
  //   });

  return (
    <div>
      <div className="serachInput">
        <input
          placeholder="Search..."
          type="text"
          name="text"
          value={query}
          onChange={handleChange}
        />
      </div>

      <div className="data">
        {query &&
          data
            .filter((i) => i.name.toLowerCase().includes(query))
            .map((item, index) => (
              <div className="searchItem" key={index}>
                {item.name}
              </div>
            ))}
      </div>
    </div>
  );
}

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(`url?q=${query}`);
//       setData(res.data);
//     };
//     if (query.length === 0 || query.length > 2) fetchData();
//   }, [query]);

//   return (
//     <div className="app">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//       <div>
//         <table>
//           <tbody>
//             <tr>
//               <th>Name</th>
//               <th>Surname</th>
//               <th>Email</th>
//             </tr>
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.first_name}</td>
//                 <td>{item.last_name}</td>
//                 <td>{item.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
