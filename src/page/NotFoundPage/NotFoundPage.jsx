import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div style={{ height: "100vh" }}>
            <Flex style={{ height: "100%" }} align="center" justify="center">
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Back Home
                        </Button>
                    }
                />
            </Flex>
        </div>
    );
}
export default NotFoundPage;
