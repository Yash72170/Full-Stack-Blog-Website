import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import Base from "../components/Base";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn, getToken } from "../auth";
import axios from "axios";

// Component to fetch and display post image with token
const PostImage = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`${BASE_URL}/post/image/${imageName}`, {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        });
        const url = URL.createObjectURL(res.data);
        setImageUrl(url);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };
    fetchImage();
  }, [imageName]);

  if (!imageUrl) return <div>Loading image...</div>;

  return <img className="img-fluid" src={imageUrl} alt="post" />;
};

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ content: "" }); // fixed typo

  useEffect(() => {
    loadPost(postId)
      .then((data) => setPost(data))
      .catch((error) => {
        console.error(error);
        toast.error("login requires");
      });
  }, [postId]);

  const printDate = (timestamp) => new Date(timestamp).toLocaleDateString();

  const submitComment = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first!");
      return;
    }

    if (comment.content.trim() === "") return;

    createComment(comment, post.postId)
      .then((data) => {
        toast.success("Comment added!");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({ content: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <span>{post.title}</span>}

        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">{post.category.categoryTitle}</span>
                  </CardText>

                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  {/* Fixed h1 inside p issue */}
                  <h1 className="mt-3">{post.title}</h1>

                  {/* Post image */}
                  {post.imageName && (
                    <div className="image-container mt-4 shadow" style={{ maxWidth: "50%" }}>
                      <PostImage imageName={post.imageName} />
                    </div>
                  )}

                  {/* Post content */}
                  <CardText className="mt-5" dangerouslySetInnerHTML={{ __html: post.content }} />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        {/* Comments Section */}
        <Row className="my-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments ({post ? post.comments.length : 0})</h3>

            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  value={comment.content}
                  onChange={(e) => setComment({ content: e.target.value })}
                />
                <Button onClick={submitComment} className="mt-2" color="primary">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
