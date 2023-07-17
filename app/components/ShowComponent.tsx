interface IShowComponent {
    isShow: boolean;
    children({ isShow }: { isShow: boolean }): any;
}

export const ShowComponent: React.FC<IShowComponent> = ({ isShow, children }) =>
    children({ isShow });
