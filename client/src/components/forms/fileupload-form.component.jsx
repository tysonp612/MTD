import React from "react";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import {
	uploadFiles,
	removeFiles,
} from "../../utils/file-upload/file-upload.utils";

// Define the FileUploadForm functional component with destructured props for values and setValues.
export const FileUploadForm = ({ values, setValues }) => {
	// Extract images from values and the current user from the Redux store.
	const user = useSelector((state) => state.user.currentUser);

	// Handles file upload and resizing.
	const fileUploadAndResize = (e) => {
		console.log(e.target.files);
		// Access the selected files from the event object.
		const files = Array.from(e.target.files);
		files.forEach((file) => {
			Resizer.imageFileResizer(
				file, // The file to resize.
				720, // Width in pixels.
				720, // Height in pixels.
				"JPEG", // Format to convert to.
				100, // Quality percentage.
				0, // Rotation in degrees.
				async (uri) => {
					// On successful resize, upload the file.
					try {
						const res = await uploadFiles(uri, user.token);
						// Update the state with the new image data, ensuring immutability.
						setValues((prevState) => ({
							...prevState,
							images: [...prevState.images, res.data],
						}));
					} catch (err) {
						console.error(err); // Log any errors.
					}
				},
				"base64" // Output format.
			);
		});
	};

	// Handles removing an image by its identifier.
	const fileRemove = async (id) => {
		try {
			await removeFiles(id, user.token);
			// Filter out the removed image and update the state.
			setValues((prevState) => ({
				...prevState,
				images: prevState.images.filter((image) => image.public_id !== id),
			}));
		} catch (err) {
			console.error(err); // Log any errors.
		}
	};

	return (
		<div>
			<div>
				{/* Map through the images and render them with a remove option. */}
				{values.images.map((image) => (
					<Badge
						count="X"
						key={image.public_id}
						style={{ cursor: "pointer" }}
						onClick={() => fileRemove(image.public_id)}
					>
						<Avatar src={image.url} size={100} shape="square" className="m-2" />
					</Badge>
				))}
			</div>
			<label className="btn btn-primary">
				Choose File
				<input
					hidden
					type="file"
					multiple
					accept="image/*" // Corrected to properly accept all image types.
					onChange={fileUploadAndResize}
				/>
			</label>
		</div>
	);
};
