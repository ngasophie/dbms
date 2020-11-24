let fake = [];
let data =  {
    "id": "3",
    "createdAt": "2020-11-14T23:23:12.128Z",
    "name": "Miss Oran Swaniawski"
  }
  for(let i =0 ; i< 1000;i++){
      // fake.push({
      //     id:i+1,
      //     createdAt:new Date().toISOString(),
      //     content: 'DBMS'
      // })
      axios.post('http://localhost:3000/data', {
            id:i+1,
            createdAt:new Date().toISOString(),
            content: 'DBMS'
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
// download(JSON.stringify(fake), 'data.json', 'application/json');

// function download(content, name, type) {
//   const a = document.body.appendChild(document.createElement('a'));
//   const file = new Blob([content], {
//     type: type
//   });
//   a.href = URL.createObjectURL(file);
//   a.download = name;
//   a.click();
// }
console.log('ok')