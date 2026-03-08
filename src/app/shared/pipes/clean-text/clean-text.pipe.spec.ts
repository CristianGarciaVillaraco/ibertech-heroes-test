import { CleanTextPipe } from './clean-text.pipe';

describe('CleanTextPipe', () => {
  let pipe: CleanTextPipe;

  beforeEach(() => {
    pipe = new CleanTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should keep alphanumeric characters and spaces', () => {
    expect(pipe.transform('Batman 123')).toBe('Batman 123');
  });

  it('should keep accented characters', () => {
    expect(pipe.transform('héroe')).toBe('héroe');
  });

  it('should keep ñ and Ñ', () => {
    expect(pipe.transform('España')).toBe('España');
  });

  it('should replace special characters with a single space', () => {
    expect(pipe.transform('A--B')).toBe('A B');
  });

  it('should not produce consecutive spaces from multiple special chars', () => {
    const result = pipe.transform('A!!!B') as string;
    expect(result).toBe('A B');
  });

  it('should trim leading and trailing spaces from special chars', () => {
    expect(pipe.transform('!hello!')).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });
});
