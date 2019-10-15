import API from '@/api/base';
export default {
    state: {
        dbname: ''
    },
    mutations: {
        setdbname: (state, dbname) => {
            state.dbname= dbname
    }
},
    actions: {
       getdbinfo: ({commit}) => {
            let host= window.location.host;
            localStorage.setItem(host,API.getDbname(p));
            let dbname= localStorage.getItem(host);
            if(!dbname) {
                var p= {host: host}
                localStorage.setItem(host,API.getDbname(p))
                commit('setdbname',API.getDbname(p))     
                // API.getDbname(p).then(result)
                // {
                //     state.dbname= JSON.stringify(result)
                //     localStorage.setItem(host,JSON.stringify(result))
    
                // }
            }
            else
            {
                 commit('setdbname',dbname)
            }
           
        }
    }
}