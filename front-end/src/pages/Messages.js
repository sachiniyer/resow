import { Link } from "react-router-dom";


function Messages() {
  return (
    <div className="Messages">
        <h1> Message Page </h1>
        <Link to = "/User#?ChatInbox"> ChatInbox </Link>
    </div>
  );
}

export default Messages;


