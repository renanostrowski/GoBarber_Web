import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';

import GlobalStyle from '../../styles/global';

import logo from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface DataForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um E-mail válido'),
          password: Yup.string().min(6, 'Deve conter no mínimo 8 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Seu cadastro foi realizado! Você já pode fazer login!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErros(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao realizar cadastro.',
          description:
            'Ocorreu um erro ao realizar seu cadastro, tente novamente mais tarde!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Realizar cadastro</h1>
            <Input name="name" placeholder="Nome" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
      <GlobalStyle />
    </Container>
  );
};

export default SignUp;
