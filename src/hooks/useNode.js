const useNode = () => {
  const insertNode = (tree, commentId, item) => {
    console.log(tree, commentId, item);
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });
      return tree;
    }
    let latestItems = [];
    latestItems = tree.items.map((ob) => insertNode(ob, commentId, item));

    return { ...tree, items: latestItems };
  };

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    let result = tree.items.filter((ob) => ob.id !== id);
    console.log(result);
    console.log(tree, id);
    return { result };
  };

  return { insertNode, editNode, deleteNode };
};

export { useNode };
