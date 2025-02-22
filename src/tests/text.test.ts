import { processText } from '../text';

test('eyo', () => {
    expect(processText('еж')).toBe('ёж');
    expect(processText('еще')).toBe('ещё');
});
