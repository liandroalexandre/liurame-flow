
export abstract class BaseEntity {
    constructor(
        public id: string,
        public createdAt: string = new Date().toISOString()
    ) { }

    abstract validate(): boolean;
}
