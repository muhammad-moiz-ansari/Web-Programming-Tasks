import { useState } from 'react';

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();		// Prevents reloading page

		console.log("Form submitted successfully!");
		console.log(formData);
		alert(`Thanks ${formData.name}, your message has been logged!`);

		// Clearing form
		setFormData({name: '', email: '', message: ''});
	};

	return (
		<section id="contact-section">
			<section id="form-container">
				<h2>Contact Us</h2>
				<div className="contact-form">
					<form onSubmit={handleSubmit}>
						<div className="contact-item">
							<label>
								Name:
								<input 
									type="text" 
									name="name" 
									placeholder="Your Name" 
									required 
									value={formData.name}			// Value will go here
									onChange={handleInputChange}	// Trigger update on typing real-time
								/><br /><br />
							</label>
						</div>
						<div className="contact-item">
							<label>
								Email:
								<input 
									type="email" 
									name="email" 
									placeholder="e.g. domain@gmail.com" 
									required 
									value={formData.email}
									onChange={handleInputChange}
								/><br /><br />
							</label>
						</div>
						<div className="contact-item">
							<label>
								Message:
								<textarea 
									name="message" 
									placeholder="Write message here" 
									required 
									value={formData.message}
									onChange={handleInputChange}
								></textarea>
							</label>
						</div>
						<br />
						<div className="contact-item">
							<button type="submit">Submit</button>
						</div>
					</form>
				</div>
			</section>
		</section>
	);
}

export default Contact;