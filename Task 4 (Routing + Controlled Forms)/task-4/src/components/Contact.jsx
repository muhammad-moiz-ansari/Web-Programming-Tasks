function Contact() {
	return (
		<section id="contact-section">
			<section id="form-container">
				<h2>Contact Us</h2>
				<div className="contact-form">
					<form>
						<div className="contact-item">
							<label>
								<p><i className="fa fa-user"></i> Name:</p>
								<input type="text" name="name" placeholder="Your Name" required /><br /><br />
							</label>
						</div>
						<div className="contact-item">
							<label>
								<p><i className="fa fa-envelope"></i> Email:</p>
								<input type="email" name="email" placeholder="e.g. domain@gmail.com" required /><br /><br />
							</label>
						</div>
						<div className="contact-item">
							<p>Message:</p>
							<textarea placeholder="Write message here"></textarea>
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