import { Test, TestingModule } from '@nestjs/testing';
import { BolsaDeValoresController } from './bolsa-de-valores.controller';
import { BolsaDeValoresService } from './bolsa-de-valores.service';

describe('BolsaDeValoresController', () => {
  let bolsaDeValoresController: BolsaDeValoresController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BolsaDeValoresController],
      providers: [BolsaDeValoresService],
    }).compile();

    bolsaDeValoresController = app.get<BolsaDeValoresController>(BolsaDeValoresController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bolsaDeValoresController.getHello()).toBe('Hello World!');
    });
  });
});
