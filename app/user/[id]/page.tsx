const User = async ({params}:{ params : Promise<{id:string}>}) => {

  const { id } = await params;
  // could fetch data(from the server) using the id param 

  //Id exactly as the folder name
  return <>User Profile : {id}</>;
};

export default User;
