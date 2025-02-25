import { processText } from '../text';

test('pre', () => {
    expect(processText('кое кто')).toBe('кое-кто');
    expect(processText('Кое кто')).toBe('Кое-кто');
    expect(processText('кое что')).toBe('кое-что');
    expect(processText('Кое что')).toBe('Кое-что');
});

test('pre-negative', () => {
    expect(processText('некое что')).toBe('некое что');
});

test('wiki', () => {
    expect(processText('"слово"')).toBe('«слово»');
    expect(processText('"слово "два" три"')).toBe('«слово „два“ три»');
});

test('eyo', () => {
    expect(processText('еж')).toBe('ёж');
    expect(processText('еще')).toBe('ещё');
});

// test('post', () => {

// });
