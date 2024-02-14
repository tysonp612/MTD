import React from "react";
import { Select } from "antd";

const { Option } = Select;
export const ProductUpdateForm = ({
	values,
	handleChange,
	handleSubmit,
	handleCatChange,
	subcategories,
	arraySubcategory,
	handleSubChange,
	categories,
}) => {
	const {
		title,
		category,
		description,
		price,
		quantity,
		shipping,
		colors,
		color,
		brand,
	} = values;

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					value={title}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					className="form-control"
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					className="form-control"
					value={price}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Shipping</label>
				<select
					name="shipping"
					className="form-control"
					value={shipping}
					onChange={handleChange}
				>
					<option>shipping?</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>
			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					value={quantity}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Colors</label>
				<select
					value={color}
					name="color"
					className="form-control"
					onChange={handleChange}
				>
					<option>please select color</option>
					{colors.map((cl) => (
						<option value={cl} key={cl}>
							{cl}
						</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Brand</label>
				<input
					type="text"
					name="brand"
					className="form-control"
					value={brand}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Categories</label>
				<select
					name="categories"
					className="form-control"
					onChange={handleCatChange}
					value={category._id}
				>
					{categories.map((c) => {
						return (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						);
					})}
				</select>
			</div>
			<br />

			<div className="form-group">
				<label className="form-label">Sub Categories</label>
				<Select
					mode="multiple"
					allowClear
					style={{ width: "100%" }}
					name="subcategory"
					value={arraySubcategory}
					placeholder="Please select"
					onChange={handleSubChange}
				>
					{subcategories.map((sub) => {
						return (
							<Option key={sub._id} value={sub._id}>
								{sub.name}
							</Option>
						);
					})}
				</Select>
			</div>

			<br />
			<button className="btn btn-primary" onClick={handleSubmit}>
				Save
			</button>
		</form>
	);
};
