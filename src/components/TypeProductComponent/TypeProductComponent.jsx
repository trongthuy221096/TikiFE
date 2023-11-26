import { Menu } from "antd";

function TypeProductComponent() {
    return (
        <div>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={new Array(15).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                })}
            />
        </div>
    );
}
export default TypeProductComponent;
