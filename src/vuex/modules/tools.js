
export const state = {
    dialogshow: false, //选择框
    dialogshow1: false,
	dialogshow2: false,
    id: 0,
    multipleSelection: [],
    menuId: 0,
    imgurl: '',
    showstate: false,
    btnid: 0,
    brandPick: '',
    goodsPick: '',
    params: {},
    datamodel: {}
}

export const mutations = {
    setdialogshow: (state) => {
        state.dialogshow = true
    },
    setdialoghidden: (state) => {
        state.dialogshow = false
    },
    setid: (state, id) => {
        state.id = id
    },
    setMultipleSelection: (state, multipleSelection) => {
        state.multipleSelection = multipleSelection
    },
    setMenuId: (state, menuId) => {
        state.menuId = menuId
    },
    setdialogshow1: (state) => {
        state.dialogshow1 = true
    },
    setdialoghidden1: (state) => {
        state.dialogshow1 = false
    },
    setimgstate: (state, stu) => {
        state.showstate = stu
    },
    setimgurl: (state, url) => {
        state.imgurl = url
    },
    setbtnid: (state, id) => {
        state.btnid = id
    },
    setbrandPick: (state, url) => {
        state.brandPick = url
    },
    setgoodsPick: (state, url) => {
        state.goodsPick = url
    },
    setparams: (state, params) => {
        state.params = params;
    },
    setdatamodel: (state, datamodel) => {
        state.datamodel = datamodel;
    },
	setdialogshow2: (state) => {
		state.dialogshow2 = true
	},
	setdialoghidden2: (state) => {
		state.dialogshow2 = false
	},
}

export const actions = {
    setdialogshow: ({ commit }) => {
        commit('setdialogshow')
    },
    setdialoghidden: ({ commit }) => {
        commit('setdialoghidden')
    },
    setid: ({ commit }, id) => {
        commit('setid', id)
    },
    setMultipleSelection: ({ commit }, multipleSelection) => {
        commit('setMultipleSelection', multipleSelection)
    },
    setMenuId: ({ commit }, menuId) => {
        commit('setMenuId', menuId)
    },
    setdialogshow1: ({ commit }) => {
        commit('setdialogshow1')
    },
    setdialoghidden1: ({ commit }) => {
        commit('setdialoghidden1')
    },
	setdialogshow2: ({ commit }) => {
		commit('setdialogshow2')
	},
	setdialoghidden2: ({ commit }) => {
		commit('setdialoghidden2')
	},
    setimgstate: ({ commit }, stu) => {
        commit('setimgstate', stu)
    },
    setimgurl: ({ commit }, url) => {
        commit('setimgurl', url)
    },
    setbtnid: ({ commit }, id) => {
        commit('setbtnid', id)
    },
    setbrandPick: ({ commit }, url) => {
        commit('setbrandPick', url)
    },
    setgoodsPick: ({ commit }, url) => {
        commit('setgoodsPick', url)
    },
    setparams: ({ commit }, params) => {
        commit('setparams', params)
    },
    setdatamodel: ({ commit }, datamodel) => {
        commit('setdatamodel', datamodel)
    }
}

export default { state, mutations, actions }