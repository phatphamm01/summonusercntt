import { Formik } from 'formik';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import tw from 'twin.macro';
import * as Yup from 'yup';

import Input from './components/Input';

import StorageToken from '~/common/utils/storage';

import Button from '~/designs/Button';

import { storeSelector } from '~/store/index';

import fetchAuth from '~/services/auth';

const PasswordFormContainer = styled.div`
  ${tw``}
`;
const Form = styled.form`
  ${tw`grid gap-20`}
  grid-template-columns: 1fr 200px;
`;
const FormInput = styled.div`
  ${tw`grid grid-cols-2 gap-4`}
`;
const PasswordCurrent = styled.div`
  ${tw`col-span-2`}
`;
const FormControl = styled.div`
  ${tw`flex-grow pb-3`}
  align-self: self-end;
`;

interface IPasswordForm {}

interface IFormValues {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

const PasswordForm: FC<IPasswordForm> = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <Formik
      initialValues={{
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object().shape({})}
      onSubmit={async (payload: IFormValues) => {
        try {
          let result = await fetchAuth.changePassword(payload);

          if (typeof result === 'string') {
            toast.error(result);
            return;
          }

          StorageToken.setUser(result.token);

          storeSelector.getState().setUser(result.data);
          storeSelector.getState().getWishlistApi();
          storeSelector.getState().getCartApi();

          toast.success('Change password success');
        } catch (error: any) {
          toast.error(error);
        }
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <PasswordFormContainer>
            <Form onSubmit={handleSubmit}>
              <FormInput>
                <PasswordCurrent>
                  <Input
                    name="passwordCurrent"
                    title="Current Password"
                    type={isShowPassword ? 'text' : 'password'}
                    value={values.passwordCurrent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.passwordCurrent}
                    touched={touched.passwordCurrent}
                    iconLeft={
                      <i
                        onClick={handleShowPassword}
                        className="text-base ri-eye-line"
                      />
                    }
                  />
                </PasswordCurrent>
                <Input
                  name="password"
                  title="New Password"
                  type={isShowPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                  iconLeft={
                    <i
                      onClick={handleShowPassword}
                      className="text-base ri-eye-line"
                    />
                  }
                />
                <Input
                  name="passwordConfirm"
                  title="Confirm Password"
                  type={isShowPassword ? 'text' : 'password'}
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                  iconLeft={
                    <i
                      onClick={handleShowPassword}
                      className="text-base ri-eye-line"
                    />
                  }
                />
              </FormInput>
              <FormControl>
                <Button type="submit" variant="container">
                  Change
                </Button>
              </FormControl>
            </Form>
          </PasswordFormContainer>
        );
      }}
    </Formik>
  );
};

export default PasswordForm;
