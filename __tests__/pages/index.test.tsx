import { fireEvent, render, screen } from '@testing-library/react';
import nock from 'nock';
import '@testing-library/jest-dom'
import Home from '../../pages';

// User story: como usuário, eu gostaria de enviar um email para outro usuário.
// AC1: Criação da tela de envio de email como no layout a seguir:
// AC2: Deve ser mostrada uma mensagem de sucesso ao enviar o email.
// AC3: Deve ser mostrada uma mensagem de erro caso o envio do email falhe.

// DoD: Testado e validado pelo QA e pelo time de design.

// Test case: Quando o usuário acessar a página do formulário, deve ser mostrado o formulário de envio de email.
// Test case: Quando o usuário preencher o formulário e enviar um email, deve ser mostrado uma mensagem de sucesso.
// Test case: Quando o usuário preencher o formulário, enviar um email e ocorrer alguma falha, deve ser mostrado uma mensagem de erro.

describe('Home page', () => {
  it('Renders form successfully', () => {
    render(<Home />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Assunto')).toBeInTheDocument();
    expect(screen.getByLabelText('Corpo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  it('Sends email successfully and shows success message', async () => {
    nock('http://localhost:3000/api').post('/email/send').reply(200, {}, { 'Access-Control-Allow-Origin': '*' });

    render(<Home />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@codersclub.com.br' } })
    fireEvent.change(screen.getByLabelText('Assunto'), { target: { value: 'Assunto' } })
    fireEvent.change(screen.getByLabelText('Corpo'), { target: { value: 'Corpo do email de teste' } })
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText('Email enviado com sucesso!')).toBeInTheDocument();
  });

  it('Shows error message when send email request fails', async () => {
    nock('http://localhost:3000/api').post('/email/send').reply(500, {}, { 'Access-Control-Allow-Origin': '*' });

    render(<Home />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@codersclub.com.br' } })
    fireEvent.change(screen.getByLabelText('Assunto'), { target: { value: 'Assunto' } })
    fireEvent.change(screen.getByLabelText('Corpo'), { target: { value: 'Corpo do email de teste' } })
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText('Houve um erro ao enviar seu email!')).toBeInTheDocument();
  });
})
