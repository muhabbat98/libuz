import {useMutation} from'@apollo/client'
import{LOGIN_READER} from '../../Graphql/Mutation'
function Auth() {
    const [ addReader, { data }] = useMutation(LOGIN_READER);
  return (
    <></>
  );
}

export default Auth;