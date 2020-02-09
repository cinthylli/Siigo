<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">CUSTOMERS AND PRODUCTS</a>
    </nav>
    <div class="container customer">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendCustomer">
                <div class="form-group">
                  <input type="text" v-model="customer.tenant_id" class="form-control" placeholder="Insert A Customer">
                </div>
                <div class="form-group">
                  <input type="text" v-model="customer.first_name" class="form-control" placeholder="Insert First Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="customer.second_name" class="form-control" placeholder="Insert Last Name">
                </div> 
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer of Customers">
                <td>{{Customer.tenant_id}}</td>
                <td>{{Customer.first_name}}</td>
                <td>{{Customer.last_name}}</td>
                <td>
                  <button @click="deleteCustomer(Customer._id)" class="btn btn-danger">Delete</button>
                  <button @click="editCustomer(Customer._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container product">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendProduct">
                <div class="form-group">
                  <input type="text" v-model="customer.tenant_id" class="form-control" placeholder="Insert A Company">
                </div>
                <div class="form-group">
                  <input type="text" v-model="customer.name" class="form-control" placeholder="Insert Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="customer.description" class="form-control" placeholder="Insert Description">
                </div>
                <div class="form-group">
                  <input type="text" v-model="customer.list_price" class="form-control" placeholder="Insert Lista Price">
                </div> 
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                 <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product of Products">
                <td>{{Customer.tenant_id}}</td>
                <td>{{Customer.name}}</td>
                <td>{{Customer.description}}</td>
                <td>{{Customer.list_price}}</td>
                <td>
                  <button @click="deleteCustomer(Customer._id)" class="btn btn-danger">Delete</button>
                  <button @click="editCustomer(Customer._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Customer {
  constructor(tenant_id = '', first_name = '', last_name = '') {
    this.tenant_id = tenant_id;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}

class Product {
  constructor(tenant_id = '', name = '', description = '', list_price = '') {
    this.tenant_id = tenant_id;
    this.name = name;
    this.description = description;
    this.list_price = list_price;
  }
}
export default {
  data() {
    return {
      customer: new Customer(),
      customers: [],
      edit: false,
      customerToEdit: '',

      product: new Product();
      product: [],
      edit: false,
      productToEdit: ''
    }
  },
  created() {
    this.getCustomers();
    this.getProducts();
  },
  methods: {
    sendCustomer() {
      if(this.edit === false) {
        fetch('/api/Customer', {
          method: 'POST',
          body: JSON.stringify(this.Customer),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getCustomers();
            this.Customer = new Customer();
          });
      }
      else {
        fetch('/api/Customer/' + this.customerToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.Customer),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getCustomers();
            this.Customer = new Customer();
            this.edit = !this.edit;
          });
      }
    },
    sendProduct() {
      if(this.edit === false) {
        fetch('/api/Product', {
          method: 'POST',
          body: JSON.stringify(this.Product),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getProducts();
            this.Product = new Product();
          });
      }
      else {
        fetch('/api/Product/' + this.productToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.Product),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getProducts();
            this.Product = new Product();
            this.edit = !this.edit;
          });
      }
    },
    getProducts() {
      fetch('/api/Product')
        .then(res => res.json())
        .then(data => {
          this.Product = data;
        });
    },
    deleteCustomer(CustomerId) {
      fetch('/api/Product/' + CustomerId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getProducts();
        });
    },
    editCustomer(ProductId) {
      fetch('/api/Product/' + ProductId)
        .then(res => res.json())
        .then(data => {
          const { _id, tenant_id, name, description, list_price} = data;
          this.Product = new Product(tenant_id, name, description, list_price);
          this.productToEdit = _id;
          this.edit = true;
        });
    }   
  }
}
</script>