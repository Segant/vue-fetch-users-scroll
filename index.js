let usersNums = 2000;
let url = `https://randomuser.me/api?results=${usersNums}`;

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
}

let app = new Vue({
    el: '#app',
    data: {
        allowScroll: false,
        users: [
            // {
            //     name: '',
            //     image: '','
            //     sname: '',
            //     gender: ''
            // }
        ],
        usersCount: 0,
        malesCount: 0,
        femalesCount: 0,
    },

    mounted (){

        window.addEventListener('DOMContentLoaded', (event) => {

            this.fetchData()
            let self = this;
            let users = document.querySelector('.users');
            
            function triggerFetch(e){
                    console.dir(window);
                    console.log(window.scrollY);
                    if(window.scrollY + window.innerHeight + 500 >= users.scrollHeight){
                        self.fetchData()
                    }
                
            }

            let delayFetch = throttle(triggerFetch, 1000);
            
            window.addEventListener('scroll',delayFetch);
        });

    },

    computed:{
    },

    methods: {
        
        fetchData() {
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                app.usersCount += usersNums;

                data.results.forEach(user => {
                    if (user.gender === "male"){
                        this.malesCount++;
                    } else {
                        this.femalesCount++;
                    }
                    
                    this.users.push(
                        {
                            name: user.name.first,
                            sname: user.name.last,
                            email: user.email,
                            image: user.picture.medium,
                            gender: user.gender
                        }
                    )
                    
                });

            })
        },

    }
});

