import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';

function CategorySideMenu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAllCategories()
            .then((data) => {
                console.log("Loaded categories:", data);
                setCategories(data || []); // safe fallback
            })
            .catch((error) => {
                console.error("Login in first to read blogs ", error);
                toast.error("login requires");
            });
    }, []);

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" action className="border-0">
                    All Blogs
                </ListGroupItem>
                {categories.length > 0 ? (
                    categories.map((cat) => (
                        <ListGroupItem
                            tag={Link}
                            to={`/categories/${cat.categoryId}`}
                            className="border-0 shadow-0 mt-1"
                            key={cat.categoryId}
                            action
                        >
                            {cat.categoryTitle}
                        </ListGroupItem>
                    ))
                ) : (
                    <ListGroupItem className="border-0 text-muted">
                        No categories found
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    );
}

export default CategorySideMenu;
