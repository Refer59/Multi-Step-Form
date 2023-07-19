import Users from "@/components/Users/Users"

async function fetchFunction(): Promise<object[]>{
  const res = await fetch('https://reqres.in/api/users')
  const data = await res.json()
  return data.data
}
 
//Esto es un react server component
const Home = async () => { 
  const users = await fetchFunction()

  return(
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Users usersData={users} />
    </>
  ) 
}

export default Home