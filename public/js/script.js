//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
class App {
  constructor() {
    this.menu = new Menu();
    this.fetchApi = new FetchApi();

    this.fetchApi.getData(this.menu.render);
    
    this.addBtn = document.getElementsByClassName('add-btn')[0];

    this.addBtn.addEventListener('click', () => {
      const addScreen = document.getElementById('add');
      const clone = document.importNode(addScreen.content, true);

      document.body.appendChild(clone);
      const target = document.getElementsByClassName('add-screen')[0];

      document.getElementById('add-btn').addEventListener('click', (event) => {
        event.preventDefault();
        const data = {};
        data['food-name'] = document.getElementById('food-name').value;
        data['food-img'] = document.getElementById('food-img').value;
        data['food-price'] = document.getElementById('food-price').value;
        data['food-type'] = document.getElementById('food-type').value;
        this.fetchApi.postData(data);
        document.body.removeChild(target);
        console.log('add sucess');
      });
      document.getElementById('exit-btn').addEventListener('click', (event) => {
        event.preventDefault();
        document.body.removeChild(target);
        console.log('exit sucess');
      });
    });

    document.getElementsByClassName('checkout')[0].addEventListener('click', () => {
      const foodList = document.getElementsByClassName('food');
      let sum = 0;
      Array.from(foodList).forEach((food, index) => {
        const price = parseInt(document.getElementsByClassName('food-price')[index].textContent);
        const count = parseInt(document.getElementsByClassName('food-count')[index].value);
        sum += (price * count);
      });
      console.log(`Total: ${sum} NTD`);
      alert(`Total: ${sum} NTD`);
    });
  }
}

class Menu {
  constructor() {
    this.menu = document.getElementsByClassName('type');
    this.foodTemplate = document.getElementById('food');
    this.render = this.render.bind(this);
  }

  render(data) {
    data.forEach((food, index) => {
      const tmp = this.$create('section', { class: 'food' });
      const foodImg = this.$create('img', { class: 'food-img', src: food['food-img'] });
      const foodName = this.$create('p', { class: 'food-name' }, food['food-name']);
      const foodPrice = this.$create('p', { class: 'food-price' }, food['food-price']);
      const count = this.$create('input', { class: 'food-count', type: 'number', min: '0', value: '0' });
      const foodType = parseInt(food['food-type'] || 0);
      tmp.appendChild(foodImg);
      tmp.appendChild(foodName);
      tmp.appendChild(foodPrice);
      tmp.appendChild(count);
      this.menu[foodType].appendChild(tmp);
    });
  }

  $create(tag = 'div', attrs = {}, text = '') {
    const node = document.createElement(tag);
    Object.keys(attrs).forEach((name) => {
      node.setAttribute(name, attrs[name]);
    });
    node.textContent = text;
    return node;
  }
}

class FetchApi {
  constructor() {
    this.url = '/food';
  }

  async getData(render) {
    try {
      const response = await fetch(this.url);
  
      if (response.ok) {
        const jsonResponse = await response.json();
        render(jsonResponse);
        console.log(jsonResponse);
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postData(data) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const app = new App();
