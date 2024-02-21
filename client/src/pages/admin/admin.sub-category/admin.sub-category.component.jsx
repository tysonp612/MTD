import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
	createSubCategory,
	getSubCategories,
	removeSubCategory,
	updateSubCategory,
} from "./../../../utils/sub-category/sub-category.utils";
import { getCategories } from "./../../../utils/category/category.utils";
import {
	UpdateCategoryForm,
	CreateCategoryForm,
} from "./../../../components/forms/category-form.component";
export const AdminSubCategory = () => {
	const [name, setName] = useState("");
	const [input, setInput] = useState("");
	const [slug, setSlug] = useState("");
	const [ok, setOk] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState([]);
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		loadSubCategories();
		loadCategories();
	}, []);

	const loadSubCategories = async () => {
		await getSubCategories()
			.then((res) => {
				setSubCategory(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadCategories = async () => {
		await getCategories()
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => console.log(err));
	};
	//Create
	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const res = await createSubCategory(user.token, name, category);
			if (res) toast.success("Sub-category created successfully");
			loadSubCategories();
			setName("");
		} catch (err) {
			if (err.response.status === 400) toast.error(err.response.data);
		}
	};
	//Update
	const handleEdit = (slug) => {
		setSlug(slug);
		setOk(true);
	};
	const handleUpdate = async (e) => {
		e.preventDefault();
		await updateSubCategory(
			slug.toLocaleLowerCase(),
			user.token,
			input,
			category
		)
			.then((res) => {
				toast.success("Sub-category updated successfully");
				loadSubCategories();
				setOk(false);
				setSlug("");
				setInput("");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data);
			});
	};
	//Delete
	const handleDelete = async (slug) => {
		const confirm = window.confirm("Are you sure to delete this sub-category?");
		if (confirm) {
			await removeSubCategory(slug, user.token)
				.then((res) => {
					toast.success("Sub-category deleted successfully");
					loadSubCategories();
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data);
				});
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h3>Create Sub-category</h3>
					<div className="form-group">
						<label>Parent Category</label>
						<select
							name="category"
							className="form-control"
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						>
							<option></option>
							{categories.length > 0 &&
								categories.map((c) => {
									return (
										<option key={c._id} value={c._id}>
											{c.name}
										</option>
									);
								})}
						</select>
					</div>
					<br />
					<CreateCategoryForm
						handleCreate={handleCreate}
						name={name}
						setName={setName}
					/>
					<br />
					Search Sub-category
					<input
						type="text"
						className="form-control"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}
					/>
					{ok ? (
						<UpdateCategoryForm
							slug={slug}
							handleUpdate={handleUpdate}
							input={input}
							setInput={setInput}
						/>
					) : (
						""
					)}
					<br />
					{subCategory
						.filter((sub) => sub.slug.includes(searchQuery))
						.map(({ _id, name, slug }) => (
							<div className="alert alert-secondary row" key={_id}>
								<div className="col-md-10">{name}</div>
								<span
									className="pr-5 col-md-1 text-center btn btn-outline-secondary"
									onClick={() => handleDelete(slug)}
								>
									Delete
								</span>
								<span
									className=" col-md-1 text-center btn btn-outline-secondary"
									onClick={() => handleEdit(slug)}
								>
									Edit
								</span>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
