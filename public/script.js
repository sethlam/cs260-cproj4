var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'All',
    drag: {},
    sort: 'no',
    Name: '',
    Code: '',
    Type: '',
    Edit: '',
  },
  created: function() {
    this.getItems();
  },
  computed: {
    filteredItems: function() {
        if (this.show === 'All') {
          return this.items;
        } else if (this.show === 'JavaScript') {
         return this.items.filter(function(item) {
           return item.Type == 'JavaScript';
         });
       } else if (this.show === 'CSS') {
         return this.items.filter(function(item) {
           return item.Type == 'CSS';
         });
       }
       else if (this.show === 'HTML') {
         return this.items.filter(function(item) {
           return item.Type == 'HTML';
         });
       }
     } 
 },
methods: {
  addItem: function() {
    axios.post("http://localhost:3000/api/items", {
      Name: this.Name,
      Code: this.Code,
      Type: this.Type,
    }).then(response => {
      this.Name = "";
      this.Code = "";
      this.Type = "";
      this.getItems();
      return true;
    }).catch(err => {
    });
  },
  deleteItem: function(item) {
    axios.delete("http://localhost:3000/api/items/" + item.id).then(response => {
      this.getItems();
      return true;
    }).catch(err => {
    });
  },
  upItem: function(item) {
    axios.put("/api/items/" + item.id, {
      Name: item.Name,
      Type: item.Type,
      Code: item.Code,
      orderChange: false,
    }).then(response => {
      this.getItems();
      return true;
    }).catch(err => {
    });
  },
  downItem: function(item) {
    axios.put("/api/items/" + item.id, {
      Name: item.Name,
      Type: item.Type,
      Code: item.Code,
      orderChange: false,
    }).then(response => {
      this.getItems();
      return true;
    }).catch(err => {
    });
  },
  showAll: function() {
    this.show = 'All';
  },
  sortThings: function() {
    if (this.sort === 'yes') 
      this.sort = 'no';
    else 
      this.sort = 'yes';
  }, 
  dragItem: function (event, item) {
    event.dataTransfer.setData( 'text/html', event.currentTarget );
    this.drag = item;
  },
  editItem: function (item) {
        axios.put("/api/items/" + item.id, {
      Name: item.Name,
      Code: this.Edit,
      Type: item.Type,
      orderChange: false,
      orderTarget: item.id,
    }).then(response => {
      this.Edit = '';
      this.getItems();
      return true;
    }).catch(err => {
    });
  },
  getItems: function() {
    axios.get("http://localhost:3000/api/items").then(response => {
      this.items = response.data;
      return true;
    }).catch(err => {
    });
  },
}
});
