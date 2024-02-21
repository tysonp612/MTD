import React from "react";
import { Avatar, Badge } from "antd";

import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import {
	uploadFiles,
	removeFiles,
} from "./../../utils/file-upload/file-upload.utils";
// import Resizer from "react-image-file-resizer";

export const FileUploadForm = ({ values, setValues }) => {
	const allUploadedFiles = values.images;
	const user = useSelector((state) => state.user.currentUser);
	const fileUploadAndResize = (e) => {
		console.log(e.target.files);
		const files = [...e.target.files];
		files.forEach(
			(file) =>
				Resizer.imageFileResizer(
					file,
					720,
					720,
					"JPEG",
					100,
					0,
					async (uri) => {
						await uploadFiles(uri, user.token)
							.then((res) => {
								console.log("CHECKIS");
								allUploadedFiles.push(res.data);
								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => console.log(err));
					}
				),
			"base64"
		);
	};
	const fileRemove = async (id) => {
		await removeFiles(id, user.token)
			.then((res) => {
				const filteredImages = values.images.filter((image) => {
					return image.public_id !== id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<div>
				{values.images.map((image) => {
					return (
						<Badge
							count="X"
							key={image.public_id}
							style={{ cursor: "pointer" }}
							onClick={() => {
								fileRemove(image.public_id);
							}}
						>
							<Avatar
								src={image.url}
								size={100}
								shape="square"
								className="m-2"
							/>
						</Badge>
					);
				})}
			</div>
			<label className="btn btn-primary">
				Choose File
				<input
					hidden
					type="file"
					multiple
					accept="images/*"
					onChange={fileUploadAndResize}
				/>
			</label>
		</div>
	);
};
