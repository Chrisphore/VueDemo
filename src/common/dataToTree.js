
export function dataToTree(data, id) {

  let tree = [];
  let o = {};

  data.forEach((v) => {
    v.children = [];
  })

  data.forEach((v, i) => {
    o[v.parentId] = [];
  });

  data.forEach((v, i) => {
    o[v.parentId].push(v);
  });


  // 添加根节点
  tree = o['null'];
  parse(o, tree, id);

  return tree;
}

function parse(o, tree, id) {
	if(tree == undefined)
	{
		return null;
	}
  for (let i = 0; i < tree.length; i++) {

    let treeId = eval("tree[i]." + id);
    if (o[treeId]) {
      if (treeId === o[treeId][0].parentId) {
        tree[i].children = o[treeId];
      }
    }

    parse(o, tree[i].children, id);
  }
}

export function toTree(data, parentKey, childrenKey, pId) {
  var tree = [];
  var temp;
  for (var i = 0; i < data.length; i++) {
    if (data[i][parentKey] == pId) {
      var obj = data[i];
      temp = toTree(data, parentKey, childrenKey, data[i][childrenKey]);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}



