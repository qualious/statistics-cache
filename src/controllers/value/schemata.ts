import Joi from 'joi';

const codename = Joi.string()
  .valid(
    'grade.points',
    'grade.merit',
    'grade.national_exam',
    'presence.valid-lt5',
    'presence.valid-5bw15',
    'presence.valid-15bw30',
    'presence.valid-gt30',
    'presence.invalid-lt5',
    'presence.invalid-5bw15',
    'presence.invalid-15bw30',
    'presence.invalid-gt30',
    'presence.1',
    'presence.2',
    'presence.3',
    'presence.5',
    'presence.10',
    'presence.11',
    'grade.total',
  )
  .required();

export const addValueSchema = Joi.alternatives().conditional(
  Joi.object({ action: 'single' }).unknown(),
  {
    then: Joi.object({
      action: Joi.string().required(),
      entity: Joi.string().required(),
      synced: Joi.string().required(),
      info: Joi.string().required(),
      value: Joi.number(),
      data: Joi.any(),
      codename,
    }),
    otherwise: Joi.object({
      action: Joi.string().required(),
      bulk: Joi.array().items(
        Joi.object().keys({
          entity: Joi.string().required(),
          synced: Joi.string().required(),
          info: Joi.string().required(),
          value: Joi.number(),
          data: Joi.any(),
          codename,
        }),
      ),
    }),
  },
);

export const searchSchema = Joi.object().keys({
  entity: Joi.string(),
  synced: Joi.date(),
  info: Joi.string(),
  value: Joi.number(),
  codename,
});
