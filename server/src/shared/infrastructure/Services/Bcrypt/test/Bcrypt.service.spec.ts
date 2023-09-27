import { BcryptService } from '../Bcrypt.service';
import { Test } from '@nestjs/testing';

describe('BcryptService', () => {
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();
    bcryptService = testingModule.get<BcryptService>(BcryptService);
  });

  describe('comparePassword', () => {
    it('should return true for matching password', async () => {
      const dummyPassword = 'Hello';
      const hash = await bcryptService.hashPassword(dummyPassword);

      const result = await bcryptService.comparePassword(dummyPassword, hash);

      // Expect Result to be true
      expect(result)?.toBe(true);
    });
  });
});
