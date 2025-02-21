// @types/eyo-kernel@2.5.6

declare module 'eyo-kernel' {
    export class Dictionary {
        /**
         * Загружает словарь.
         */
        load(filename: string, callback: Function): void;

        /**
         * Синхронно загружает словарь.
         */
        loadSync(filename: string): void;

        /**
         * Загружает безопасный встроенный словарь.
         */
        loadSafe(callback: Function): void;

        /**
         * Синхронно загружает безопасный встроенный словарь.
         */
        loadSafeSync(): void;

        /**
         * Загружает небезопасный встроенный словарь.
         */
        loadNotSafe(callback: Function): void;

        /**
         * Синхронно загружает небезопасный встроенный словарь.
         */
        loadNotSafeSync(): void;

        /**
         * Очищает словарь.
         */
        clear(): void;

        /**
         * Восстанавливает в слове букву «ё».
         */
        restoreWord(word: string): string;

        /**
         * Добавляет слово в словарь.
         */
        addWord(rawWord: string): void;

        /**
         * Удаляет слово из словаря.
         */
        removeWord(word: string): void;

        /**
         * Установить словарь.
         */
        set(dict: string | string[]): void;

        /**
         * Получить словарь.
         */
        get(): object;
    }

    export class Eyo {
        readonly dictionary: Dictionary;

        /**
         * Ищет варианты замены буквы «е» на «ё».
         *
         * @param groupByWords Группировать по словам.
         */
        lint(text: string, groupByWords: boolean): Array<any>;

        /**
         * Восстанавливает букву «ё» в тексте.
         */
        restore(text: string): string;
    }
}
