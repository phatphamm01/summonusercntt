import React, { FC, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Main from './Main';
import Verify from './Verify';

const LoginContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`grid gap-6 py-10`}
`;
const FormControl = styled.div`
  ${tw`grid gap-4 mt-4`}
`;
const Text = styled.span`
  ${tw`text-center`}
`;

const SignupContainer = styled.div`
  ${tw``}
`;
interface ISignup {}

const Email = (() => {
  let email: string = '';
  const getEmail = () => {
    return email;
  };
  const setEmail = (newEmail: string) => {
    email = newEmail;
  };

  return {
    getEmail: getEmail,
    setEmail: setEmail,
  };
})();

export const EmailContext = React.createContext(Email);

const Signup: FC<ISignup> = () => {
  const [isVerify, setisVerify] = useState<boolean>(false);

  const handleVerify = () => {
    setisVerify(!isVerify);
  };

  return (
    <EmailContext.Provider value={Email}>
      {!isVerify && <Main handleClickVerify={handleVerify} />}
      {isVerify && <Verify handleClickVerify={handleVerify} />}
    </EmailContext.Provider>
  );
};

export default Signup;
