import { Router } from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUsecase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  ); 

  await submitFeedbackUsecase.execute({
    type,
    comment,
    screenshot  
  });

  return res.status(201).send();
})

