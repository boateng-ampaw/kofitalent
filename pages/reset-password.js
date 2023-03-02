export default function ResetPassword(){
    return (
        <div>
            reset your password
        </div>
    )
}

export async function getServerSideProps(context){
    const token = context.req?.cookies?.token;
  
      if (token) {
          return {
            redirect: {
              destination: '/dashboard',
              permanent: false,
            },
          }
        }
  
      // console.log(context.query);
  
      const {act,key} = context.query
  
      const reset_link = (act && key) ? `https://badmin.kofitalent.com/users/lost-password.php?act=${act}&key=${key}` : null
  
      // console.log(reset_link);



      const resp = await fetch(`${reset_link}`,{
        credentials: 'include',
        redirect: 'follow'
      })

      const data = await resp.json()

      // console.log(data);
  
      return {
        props: {
            
        }
      }
  }
  